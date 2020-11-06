package edu.rpi.imanatask.model;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import edu.rpi.imanatask.controller.TaskListController;
import edu.rpi.imanatask.entity.TaskList;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class TaskListModelAssembler implements RepresentationModelAssembler<TaskList, EntityModel<TaskList>> {

    @Override
    public EntityModel<TaskList> toModel(TaskList taskList) {
        return EntityModel.of(taskList,
            linkTo(methodOn(TaskListController.class).getOneTaskList(taskList.getTaskListID())).withSelfRel(),
            linkTo(methodOn(TaskListController.class).getManyTaskLists()).withRel("tasklists"));  
    }
    
}
