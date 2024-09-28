import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import { useState } from "react";
import axios from "axios";

export default function Section() {
    const [selectedValue, setSelectedValue] = useState('');
    const [area, setArea] = useState(0);
    const [lift, setLift] = useState(0);
    const [gym, setGym] = useState(0);
    const [bhk, setBhk] = useState(0);
    const [success, setSuccess] = useState(false);
    const [result, setResult] = useState('');

    return (
        <section id="content" className="dark:bg-slate-800 dark:text-gray-800">
            <div className="flex flex-col items-center px-auto py-12">
                <div className="bg-gray-100 container w-3/4 rounded-md">
                    <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="text-3xl dark:text-violet-600 font-medium">House Information</p>
                                <p className="text-xs">Enter your House Information and check its price</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="area" className="block mb-2">Area</label>
                                    <input id="area" type="text" placeholder="Area" className="block w-full p-2 border border-gray-300 rounded" onChange={(e) => setArea(e.target.value)} />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="bhk" className="block mb-2">BHK</label>
                                    <input id="bhk" type="text" placeholder="BHK" className="block w-full p-2 border border-gray-300 rounded" onChange={(e) => setBhk(e.target.value)} />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <Checkbox isChecked={lift} setIsChecked={setLift} label="Lift" id="cbx1"/>
                                    <Checkbox isChecked={gym} setIsChecked={setGym} label="Gym/Clubhouse/Swimming Pool" id="cbx2"/>
                                </div>
                            </div>
                            <div className="flex justify-end col-span-full justify-between">
                                {success && <div className="text-center text-xl font-medium text-green-500">{result}</div>}
                                <button
                                    type="button"
                                    className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const url = 'http://127.0.0.1:5000/predict';  // Replace with your actual endpoint
                                        const data = {
                                            location: "Sion",
                                            area: "432",
                                            bhk: "2",
                                            gym: "0",
                                            lift: "1"
                                        };
                                        try {
                                            const response = await axios.post(url, data, {
                                                headers: {
                                                    "Access-Control-Allow-Origin": "*",
                                                    "Content-Type": "application/json"
 
                                                }

                                            });
                                            console.log('Response:', response.data);
                                            if(response.data){
                                                setSuccess(true)
                                                setResult(response.data)
                                            }
                                        } catch (error) {
                                            console.error('Error:', error);
                                        }
                                    }}
                                >Get Price</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    )
}


