
export function login(req, res){
  console.log(req.body);
  return res.send({
    id: 0,
    first_name: 'Person',
    last_name: 'McPerson',
    email: req.body.email,
  })
}
