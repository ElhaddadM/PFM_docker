// please install npm install react-apexcharts apexcharts
import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";
import axios from "axios";
function Piechart(){

    const [data,setData] = useState([])
    const series = []
    
useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/rdv/count `)
  .then((response) => {
    setData( response.data.CountRdv )
  });
},[]);

data.map((e)=>{
    series.push(e.Nbr)
  
})

console.log('db ', series);
    return(
        <React.Fragment>
            <div className="w-50  ps-3">
                <Chart 
                type="pie"
                height={500}
                series={series}                
                options={{
                        title:{ text:"Service Secteurs"
                        } , 
                       noData:{text:"No data existe"},                        
                      colors:["#0068B9",'#3df449',"#FEB019"],
                      labels:['Inscription',' Reinscription',' Certificat']                     
                 }}
                >
                </Chart>
            </div>
        </React.Fragment>
    );
}
export default Piechart;