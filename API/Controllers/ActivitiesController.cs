using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController: BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
    {
        return await Mediator.Send(new GetActivityList.Query(), ct);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(string id, CancellationToken ct)
    {
       return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }, ct));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto, CancellationToken ct)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }, ct));
    }

    [HttpPut]
    public async Task<ActionResult<string>> EditActivity(EditActivityDto activityDto, CancellationToken ct)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activityDto }, ct));
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult<string>> DeleteActivity(string id, CancellationToken ct)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }, ct));
    }

}
