insert into list_item(item,done,budget,list_id)
values(${name}, ${bool}, ${cost}, ${id} )
returning *;