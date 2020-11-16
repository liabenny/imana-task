package edu.rpi.imanatask.repository;

import java.util.Map;

import org.springframework.data.repository.CrudRepository;

import edu.rpi.imanatask.entity.Task;

public interface TaskRepository extends CrudRepository<Task, String> {

    Iterable<Task> findByTaskListID(String taskListId);

    void findAndRemoveByTaskListID(String taskListId);

    Iterable<Task> findAll(Map<String, String> search);

}
