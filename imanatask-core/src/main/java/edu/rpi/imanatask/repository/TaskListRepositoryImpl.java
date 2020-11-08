package edu.rpi.imanatask.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import edu.rpi.imanatask.entity.TaskList;

public class TaskListRepositoryImpl implements TaskListRepository {

    @Autowired
    private MongoOperations operations;

    @Override
    public <S extends TaskList> Iterable<S> saveAll(Iterable<S> entities) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<TaskList> findById(String id) {
        TaskList taskList = operations.findById(id, TaskList.class);
        return Optional.ofNullable(taskList);
    }

    @Override
    public boolean existsById(String id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public Iterable<TaskList> findAll() {
        return operations.findAll(TaskList.class);
    }

    @Override
    public Iterable<TaskList> findAllById(Iterable<String> ids) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public long count() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public void deleteById(String id) {
        operations.findAndRemove(Query.query(Criteria.where("_id").is(id)), TaskList.class);
    }

    @Override
    public void delete(TaskList entity) {
        // TODO Auto-generated method stub

    }

    @Override
    public void deleteAll(Iterable<? extends TaskList> entities) {
        // TODO Auto-generated method stub

    }

    @Override
    public void deleteAll() {
        // TODO Auto-generated method stub

    }

    @Override
    public <S extends TaskList> S save(S entity) {
        return operations.save(entity);
    }
    
}
