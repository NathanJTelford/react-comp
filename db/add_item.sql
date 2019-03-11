insert into list_item(item,done,budget,user_id)
values(${name}, ${bool}, ${cost},${id} )
returning *;