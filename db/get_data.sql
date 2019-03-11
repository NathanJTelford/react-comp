select ${q} from toDoer
where age = (select age from toDoer where id = {id})
