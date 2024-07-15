Create Table RTRaftList(
    id serial primary key,
    raft_res_name varchar(255) not null,
    raft_type varchar(255) not null,
    departure_date TIMESTAMP NOT NULL,
    unit integer not null,
    arrival_date TIMESTAMP
);




drop table RTRaftList;

SELECT * FROM RTRaftList 
WHERE departure_date >= CURRENT_DATE AND arrival_date IS NULL