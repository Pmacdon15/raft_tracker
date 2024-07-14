Create Table RTRaftList
(
    id serial primary key,
    raft_id integer not null,
    raft_res_name varchar(255) not null,
    raft_type varchar(255) not null,
    departure_date date not null,
    unit integer not null,
    arrival_date date
);

ALTER TABLE RTRaftList
ADD COLUMN unit integer NOT NULL;

select * from RTRaftList;