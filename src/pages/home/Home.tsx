import Card from "../../globals/components/card/Card"
import { useAppDispatch } from "../../store/hooks"
import Hero from "./component/Hero"



const Home = () => {
  const dispatch =useAppDispatch()
  return (
    <>
    <Hero/>
    <div className="flex flex-col items-center">
    <h1 className="text-4xl font-bold  text-center mb-6 text-gray-800">Top Products</h1>
    <div className="flex flex-wrap justify-center gap-6">
    <Card/>
    <Card />
    <Card />
    </div>
    </div>
  </>
  )
}

export default Home