package edu.rpi.imanatask.repository;

import org.springframework.data.repository.CrudRepository;

import edu.rpi.imanatask.entity.TaskList;

public interface TaskListRepository extends CrudRepository<TaskList, String> {

}
