using API.Middleware;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDBContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// Add CORS policy to allow requests from React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// MediatR and validator
builder.Services.AddMediatR(
    cfg =>
    {
        cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
        cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
    }
);

builder.Services.AddTransient<ExceptionMiddleware>();

// Automapper
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MappingProfiles>();
});

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

var app = builder.Build();

// use middleware
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy before mapping controllers
app.UseCors("ReactCorsPolicy");

app.MapControllers();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDBContext>();
    await context.Database.MigrateAsync(); // create db table when not exist
    await DbInitializer.SeedData(context); // seed data in activity table data
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration.");
}

app.Run();
