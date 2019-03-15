select ${q} from toDoer
where 
EXISTS (select ${q} from toDoer where id = ${id})
