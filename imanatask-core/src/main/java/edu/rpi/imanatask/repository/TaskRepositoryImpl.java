package edu.rpi.imanatask.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.Assert;

import edu.rpi.imanatask.entity.Task;

public class TaskRepositoryImpl implements TaskRepository {

    @Autowired
    private MongoOperations operations;

    @Override
    public <S extends Task> S save(S entity) {
        return operations.save(entity);
    }

    @Override
    public <S extends Task> Iterable<S> saveAll(Iterable<S> entities) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<Task> findById(String id) {
        Task task = operations.findById(id, Task.class);
        return Optional.ofNullable(task);
    }

    @Override
    public boolean existsById(String id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public Iterable<Task> findAll() {
        return operations.findAll(Task.class);
    }

    @Override
    public Iterable<Task> findAllById(Iterable<String> ids) {
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
        operations.findAndRemove(Query.query(Criteria.where("_id").is(id)), Task.class);
    }

    @Override
    public void delete(Task entity) {
        // TODO Auto-generated method stub

    }

    @Override
    public void deleteAll(Iterable<? extends Task> entities) {
        // TODO Auto-generated method stub

    }

    @Override
    public void deleteAll() {
        // TODO Auto-generated method stub

    }

    @Override
    public Iterable<Task> findByTaskListID(String taskListId) {
        return operations.find(Query.query(Criteria.where("taskListId").is(taskListId)), Task.class);
    }

    @Override
    public void findAndRemoveByTaskListID(String taskListId) {
        operations.findAndRemove(Query.query(Criteria.where("taskListId").is(taskListId)), Task.class);
    }

    @Override
    public Iterable<Task> findAll(Map<String, Object> search) {
        List<Criteria> criterias = new ArrayList<>();
        if (search.containsKey("isComplete")) {
            criterias.add(Criteria.where("isComplete").is(search.get("isComplete")));
        }
        if (search.containsKey("startDate")) {
            Assert.state(search.get("startDate") instanceof Number, "(startDate) should be a Number.");
            long startTime = ((Number) search.get("startDate")).longValue();
            criterias.add(Criteria.where("deadline").gte(startTime));
        }
        if (search.containsKey("endDate")) {
            Assert.state(search.get("endDate") instanceof Number, "(endDate) should be a Number.");
            long endTime = ((Number) search.get("endDate")).longValue();
            criterias.add(Criteria.where("deadline").lte(endTime));
        }

        Criteria criteria = new Criteria();
        if (!criterias.isEmpty()) {
            criteria.andOperator(criterias.toArray(new Criteria[0]));
        } 
        return operations.find(Query.query(criteria), Task.class);
    }
    
}
