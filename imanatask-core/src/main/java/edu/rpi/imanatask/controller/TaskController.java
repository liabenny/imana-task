package edu.rpi.imanatask.controller;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.rpi.imanatask.model.TaskModelAssembler;
import edu.rpi.imanatask.repository.TaskListRepository;
import edu.rpi.imanatask.repository.TaskRepository;
import edu.rpi.imanatask.entity.Task;
import edu.rpi.imanatask.exception.TaskListNotFoundException;
import edu.rpi.imanatask.exception.TaskNotFoundException;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
public class TaskController {
    
    private final TaskRepository taskRepository;

    private final TaskListRepository taskListRepository;

    private final TaskModelAssembler taskModelAssembler;

    TaskController(TaskRepository taskRepository,
                 TaskModelAssembler taskModelAssembler,
                 TaskListRepository taskListRepository) {
        this.taskModelAssembler = taskModelAssembler;
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @GetMapping("/api/tasks/{id}")
    public EntityModel<Task> getOneTask(@PathVariable String id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
        
        return taskModelAssembler.toModel(task);
    }

    @GetMapping("/api/tasks")
    public CollectionModel<EntityModel<Task>> getManyTasks(@RequestParam(required = false) Map<String, String> search) {
        Iterable<Task> iterable = search == null ? 
        taskRepository.findAll() : taskRepository.findAll(search);
        List<EntityModel<Task>> tasks = StreamSupport.stream(iterable.spliterator(), false)
            .map(taskModelAssembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(tasks,
            linkTo(methodOn(TaskController.class).getManyTasks(search)).withSelfRel());
    }

    @GetMapping("/api/tasklists/{taskListId}/tasks")
    public CollectionModel<EntityModel<Task>> getManyTasks(@PathVariable String taskListId) {
        Iterable<Task> tasks = taskRepository.findByTaskListID(taskListId);
        List<EntityModel<Task>> entityModels = StreamSupport.stream(tasks.spliterator(), false)
            .map(taskModelAssembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
        linkTo(methodOn(TaskController.class).getManyTasks(taskListId)).withSelfRel(),
        linkTo(methodOn(TaskListController.class).getOneTaskList(taskListId)).withRel("tasklist"));
    }

    @PostMapping("/api/tasks")
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        task.setIsComplete(false);
        if (task.getTaskListId() != null) {
            taskListRepository.findById(task.getTaskListId())
                .orElseThrow(() -> new TaskListNotFoundException(task.getTaskListId()));
        }

        EntityModel<Task> entityModel = taskModelAssembler.toModel(taskRepository.save(task));

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @DeleteMapping("/api/tasks/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        taskRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/tasks/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task newTask, @PathVariable String id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));

        if (newTask.getTaskListId() != null) {
            taskListRepository.findById(newTask.getTaskListId())
                .orElseThrow(() -> new TaskListNotFoundException(newTask.getTaskListId()));
        }
        
        task.setName(newTask.getName());
        task.setDescription(newTask.getDescription());
        task.setDeadline(newTask.getDeadline());
        task.setTaskListId(newTask.getTaskListId());
        Task updatedTask = taskRepository.save(task);
        EntityModel<Task> entityModel = taskModelAssembler.toModel(updatedTask);

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @PatchMapping("/api/tasks/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Map<String, Object> fields, @PathVariable String id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
        
        fields.forEach((k, v) -> {
            Field field = ReflectionUtils.findField(Task.class, k);
            field.setAccessible(true);
            ReflectionUtils.setField(field, task, v);
        });

        if (fields.containsKey("taskListId")) {
            taskListRepository.findById((String) fields.get("taskListId"))
                .orElseThrow(() -> new TaskListNotFoundException((String) fields.get("taskListId")));
        }

        Task updatedTask = taskRepository.save(task);
        EntityModel<Task> entityModel = taskModelAssembler.toModel(updatedTask);

        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    } 

    @PutMapping("/api/tasks/{id}/done")
    public ResponseEntity<?> finishTask(@PathVariable String id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
        
        task.setIsComplete(true);
        Task updatedTask = taskRepository.save(task);
        EntityModel<Task> entityModel = taskModelAssembler.toModel(updatedTask);
        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }

    @PutMapping("/api/tasks/{id}/undo")
    public ResponseEntity<?> undoFinishTask(@PathVariable String id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
        
        task.setIsComplete(false);
        Task updatedTask = taskRepository.save(task);
        EntityModel<Task> entityModel = taskModelAssembler.toModel(updatedTask);
        return ResponseEntity
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
            .body(entityModel);
    }
}
