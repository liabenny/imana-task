package edu.rpi.imanatask.repository;
import org.springframework.data.repository.CrudRepository;

import edu.rpi.imanatask.entity.Task;

public interface TaskRepository extends CrudRepository<Task, String> {
    
}
