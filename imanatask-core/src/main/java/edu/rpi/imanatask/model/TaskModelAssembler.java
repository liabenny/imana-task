package edu.rpi.imanatask.model;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import edu.rpi.imanatask.controller.TaskController;
import edu.rpi.imanatask.entity.Task;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.HashMap;

@Component
public class TaskModelAssembler implements RepresentationModelAssembler<Task, EntityModel<Task>>{

    @Override
    public EntityModel<Task> toModel(Task task) {
        EntityModel<Task> taskModel = EntityModel.of(task,
            linkTo(methodOn(TaskController.class).getOneTask(task.getId())).withSelfRel(),
            linkTo(methodOn(TaskController.class).getManyTasks(new HashMap<>())).withRel("tasks"));
        
        if (!task.getIsComplete()) {
            taskModel.add(linkTo(methodOn(TaskController.class).finishTask(task.getId())).withRel("finish"));
        } else {
            taskModel.add(linkTo(methodOn(TaskController.class).undoFinishTask(task.getId())).withRel("undo"));
        }

        return taskModel;
    }
    
}
