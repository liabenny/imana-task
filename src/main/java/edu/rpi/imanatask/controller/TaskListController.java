package edu.rpi.imanatask.controller;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.rpi.imanatask.model.TaskListModelAssembler;
import edu.rpi.imanatask.repository.TaskListRepository;
import edu.rpi.imanatask.entity.Task;
import edu.rpi.imanatask.entity.TaskList;
import edu.rpi.imanatask.exception.TaskListNotFoundException;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
public class TaskListController {
    
    private final TaskListRepository taskListRepository;

    private final TaskListModelAssembler taskListModelAssembler;

    TaskListController(TaskListRepository taskListRepository, TaskListModelAssembler taskListModelAssembler) {
        this.taskListModelAssembler = taskListModelAssembler;
        this.taskListRepository = taskListRepository;
    }

    @GetMapping("/tasklists/{id}")
    public EntityModel<TaskList> getOneTaskList(@PathVariable String id) {
        TaskList taskList = taskListRepository.findById(id)
            .orElseThrow(() -> new TaskListNotFoundException(id));

        return taskListModelAssembler.toModel(taskList);
    }

    @GetMapping("/tasklists")
    public CollectionModel<EntityModel<TaskList>> getManyTaskLists() {
        Iterable<TaskList> iterable = taskListRepository.findAll();
        List<EntityModel<TaskList>> tasklists = StreamSupport.stream(iterable.spliterator(), false)
            .map(taskListModelAssembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(tasklists,
        linkTo(methodOn(TaskListController.class).getManyTaskLists()).withSelfRel());
    }

    @GetMapping("/tasklists/{id}/tasks")
    public CollectionModel<EntityModel<Task>> getManyTasks(@PathVariable String id) {
        //TODO implementation
        return null;
    }

    @PostMapping("/tasklists")
    public ResponseEntity<?> createTaskList(@RequestBody TaskList taskList) {
        TaskList newTaskList = taskListRepository.save(taskList);

        return ResponseEntity
        .created(linkTo(methodOn(TaskListController.class).createTaskList(taskList)).toUri())
        .body(taskListModelAssembler.toModel(newTaskList));
    }

    @DeleteMapping("/tasklists/{id}")
    public ResponseEntity<?> deleteTaskList(@PathVariable String id) {
        taskListRepository.deleteById(id);
        //TODO delete tasks

        return ResponseEntity.ok().build();
    }

    @PutMapping("/tasklists/{id}")
    public ResponseEntity<?> updateTaskList(@RequestBody TaskList newTaskList, @PathVariable String id) {
        TaskList taskList = taskListRepository.findById(id)
            .orElseThrow(() -> new TaskListNotFoundException(id));

        taskList.setName(newTaskList.getName());
        TaskList updatedTaskList = taskListRepository.save(taskList);
        EntityModel<TaskList> entityModel = taskListModelAssembler.toModel(updatedTaskList);

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }
}
