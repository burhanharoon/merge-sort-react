import { useState } from 'react';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'


function App() {
  const numbers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  // const [half, setHalf] = useState(numbers.length / 2)
  const half = numbers.length / 2
  const firstHalf = half / 2
  const secondHalf = numbers.length

  // console.log(half);

  return (

    <DndProvider backend={HTML5Backend}>


      {/* Displaying Initial Array */}
      <div className='flex  justify-center mb-4'>
        {
          numbers.map(number => {
            return (
              <div key={number} className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>
                {number}
              </div>
            )
          })
        }
      </div>

      {/* Middle Layer */}
      <div className='flex justify-center w-full gap-8 mb-4'>
        <div className='flex'>
          {numbers.map((number, index) => {
            return (
              index < half ?
                <div className='p-8  bg-slate-300 border-r-2 border-white w-20 h-20 '>{number}</div> : ""
            )
          })}
        </div>

        <div className='flex'>
          {numbers.map((number, index) => {
            return (
              index >= half ?
                <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>{number}</div> : ""
            )
          })}
        </div>
      </div>



      {/* Third Layer */}
      <div className='flex justify-center w-full gap-8 mb-4'>
        <div className='flex'>
          {numbers.map((number, index) => {
            return (
              index < firstHalf - 1 ?
                <div className='p-8  bg-slate-300 border-r-2 border-white w-20 h-20 '>*{number}</div> : ""
            )
          })}
        </div>

        <div className='flex'>
          {numbers.map((number, index) => {
            return (
              index >= firstHalf - 1 && index <= half - 1 ?
                <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>{number}</div> : ""
            )
          })}
        </div>
        <div className='flex'>
          {numbers.map((number, index) => {
            return (
              index > half - 1 && index <= 6 ?
                <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>*{number}</div> : ""
            )
          })}
        </div>
        <div className='flex'>
          {numbers.map((number, index) => {
            return (
              index >= 7 ?
                <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>{number}</div> : ""
            )
          })}
        </div>
      </div>



      {/* Final Layer */}
      <div className='flex  justify-center mb-4 gap-4'>
        {
          numbers.map(number => {
            return (
              <div key={number} className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>
                {number}
              </div>
            )
          })
        }
      </div>



    </DndProvider>
  );
}

export default App;
