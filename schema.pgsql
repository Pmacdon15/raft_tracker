Create Table RTRaftList(
    id serial primary key,
    raft_res_name varchar(255) not null,
    raft_type varchar(255) not null,
    departure_date date not null,
    unit integer not null,
    arrival_date date
);



select * from RTRaftList;
drop table RTRaftList;

  SELECT * FROM RTRaftList 
      WHERE departure_date >= CURRENT_DATE AND arrival_date IS NULL