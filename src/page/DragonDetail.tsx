import { useParams } from "react-router"

export default function DragonDetail() {
  const param = useParams()

  //Préparer un state
  //Préparezr un useEffect
  //call l'api en essayant de récupérer un Dragon
  console.log(param)

  return (
    <div>
      <h1>Dragon : {param.name}</h1>
    </div>
  )
}
