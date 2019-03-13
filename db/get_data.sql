select ${q} from toDoer
where ${q} = (select ${q} from toDoer where id = ${id})
