import { useState, useCallback, memo } from 'react';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper';
import { Box } from './Box';
import { Container } from './Container';
import infoIcon from './icons8-info.png'
import nextIcon from './icons8-next.png'

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const numbers = []
for (let i = 0; i < 10; i++) {
  let digit = (getRndInteger(0, 100))
  numbers.push(digit)
  // numbers.sort()
}
function sort(numbers) {
  // var ary = [2, 1, 0.4, 2, 0.4, 0.2, 1.5, 1, 1.1, 1.3, 1.2, 0.2, 0.4, 0.9];
  // use custom compare function that sorts numbers ascending
  numbers.sort(function (a, b) {
    return b - a;
  })
}


sort(numbers)

console.log(numbers);// numbers.reverse()
let ItemTypes = {}
numbers.forEach(number => {
  ItemTypes[`Item${number}`] = number;
})

console.log(ItemTypes);

function App() {

  const [boxes] = useState([
    { name: `${numbers[0]}`, type: ItemTypes[`Item${numbers[0]}`] },
    { name: `${numbers[1]}`, type: ItemTypes[`Item${numbers[1]}`] },
    { name: `${numbers[2]}`, type: ItemTypes[`Item${numbers[2]}`] },
    { name: `${numbers[3]}`, type: ItemTypes[`Item${numbers[3]}`] },
    { name: `${numbers[4]}`, type: ItemTypes[`Item${numbers[4]}`] },
    { name: `${numbers[5]}`, type: ItemTypes[`Item${numbers[5]}`] },
    { name: `${numbers[6]}`, type: ItemTypes[`Item${numbers[6]}`] },
    { name: `${numbers[7]}`, type: ItemTypes[`Item${numbers[7]}`] },
    { name: `${numbers[8]}`, type: ItemTypes[`Item${numbers[8]}`] },
    { name: `${numbers[9]}`, type: ItemTypes[`Item${numbers[9]}`] },
  ]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }


  /* For Dustbins */
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes[`Item${numbers[0]}`]], lastDroppedItem: null },
    { accepts: [ItemTypes[`Item${numbers[1]}`]], lastDroppedItem: null },
  ]);



  const handleDrop = useCallback((index, item) => {
    const { name } = item;
    setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
    setDustbins(update(dustbins, {
      [index]: {
        lastDroppedItem: {
          $set: item,
        },
      },
    }));
  }, [droppedBoxNames, dustbins]);
  // ends here


  const half = numbers.length / 2
  const firstHalf = half / 2
  const secondHalf = numbers.length

  const [firstShow, setfirstShow] = useState(true)
  const [secondShow, setsecondShow] = useState(false)
  const [nextArray, setNextArray] = useState(10)
  // const [fourthShow, setfourthShow] = useState(false)

  const [showNumber, setShowNumber] = useState(1)


  const [showNextElement, setShowNextElement] = useState(0)


  return (


    <div>

      <div className='fixed right-0 top-40 '>
        <DndProvider backend={HTML5Backend}>
          <div className='flex flex-col gap-1 justify-center'>
            {boxes.reverse().map(({ name, type }, index) => (
              index >= 5 &&
              <Box name={name} type={type} isDropped={isDropped(name)} key={index} />))
            }
          </div>
        </DndProvider>
      </div>

      <div className='fixed left-0 top-40'>
        <DndProvider backend={HTML5Backend}>
          <div className='flex flex-col gap-1 justify-center'>
            {boxes.map(({ name, type }, index) => (
              index < 5 &&
              <Box name={name} type={type} isDropped={isDropped(name)} key={index} />))
            }
          </div>
        </DndProvider>
      </div>

      <img onClick={() => { setNextArray(nextArray + 1) }} src={nextIcon} className='fixed top-72 rotate-90 left-36' />




      <div className='w-full flex items-center flex-col'>

        <p className=' w-max text-white p-2 rounded-xl bg-slate-500 m-2'>Read this first:</p>
        <p className='w-max flex items-center bg-blue-200 rounded-xl p-2 m-2'> <img src={infoIcon} width='30px' height='10px' alt="" /> You can drag and drop elements from left and right side to boxex</p>
        <p className=' w-max  p-2 rounded-xl bg-blue-200 m-2'>Initial Array:</p>
        <p className=' w-max  p-2 rounded-xl bg-blue-200 m-2'>Total elements = 10</p>

        {/* Displaying Initial Array */}
        <div className='flex border-black border-b-4 justify-center mb-4'>
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
        {2 <= nextArray &&

          <div className='flex flex-col justify-center'>
            <div className='flex  justify-center'>
              <p className=' w-max  p-2 rounded-xl bg-blue-200 m-2'>Half = 10/2 = 5</p>
              <p className=' w-max  p-2 rounded-xl bg-blue-200 m-2'>Therefore Array devided into 2 parts</p>
            </div>
            <div className='flex justify-center w-full gap-8 mb-4'>
              <div className='flex border-b-4 border-black'>
                {numbers.map((number, index) => {
                  return (
                    index < half ?
                      <div className='p-8  bg-slate-300 border-r-2 border-white w-20 h-20 '>{number}</div> : ""
                  )
                })}
              </div>

              <div className='flex border-b-4 border-black'>
                {numbers.map((number, index) => {
                  return (
                    index >= half ?
                      <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>{number}</div> : ""
                  )
                })}
              </div>
            </div>
          </div>

        }



        {/* Third Layer */}

        {3 <= nextArray &&
          <div className='flex justify-center w-full gap-12 mb-4'>
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
        }



        {/* Fourth Layer */}

        {4 <= nextArray &&
          <div className='flex  gap-4 mb-4'>

            <div className='flex items-center  gap-2 flex-col'>
              <div className='w-50 bg-blue-200 p-2 rounded-xl'>
                <p>Array has 2 elements {numbers[0]} and {numbers[1]}</p>
                <p>Half = Length/2 = 1</p>
                <p>{numbers[0]} and {numbers[1]} are divided into 2 arrays</p>
              </div>
              <div className='flex gap-4'>
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {numbers[0]}
                </div>
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {numbers[1]}
                </div>
              </div>
            </div>


            <div className='flex items-center  gap-2 flex-col'>
              <div className='w-50 bg-blue-200 p-2 rounded-xl'>
                <p>Array has 3 elements {numbers[2]}, {numbers[3]}and {numbers[4]}</p>
                <p>Half = Length/2 = 1.5</p>
                <p>{numbers[2]}, {numbers[3]} and {numbers[4]} are divided into 2 arrays</p>
              </div>
              <div className='flex gap-4'>
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {numbers[2]}
                </div>
                <div className='flex border-b-2 border-black'>
                  <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>
                    {numbers[3]}
                  </div>
                  <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>
                    {numbers[4]}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center  gap-2 flex-col'>
              <div className='w-50 bg-blue-200 p-2 rounded-xl'>
                <p>Array has 2 elements {numbers[5]} and {numbers[6]}</p>
                <p>Half = Length/2 = 1</p>
                <p>{numbers[5]} and {numbers[6]} are divided into 2 arrays</p>
              </div>
              <div className='flex gap-4'>
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {numbers[5]}
                </div>
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {numbers[6]}
                </div>
              </div>
            </div>


            <div className='flex items-center  gap-2 flex-col'>
              <div className='w-50 bg-blue-200 p-2 rounded-xl'>
                <p>Array has 3 elements {numbers[7]}, {numbers[8]}and {numbers[9]}</p>
                <p>Half = Length/2 = 1.5</p>
                <p>{numbers[7]}, {numbers[8]} and {numbers[9]} are divided into 2 arrays</p>
              </div>
              <div className='flex gap-4'>
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {numbers[7]}
                </div>
                <div className='flex border-b-2 border-black'>
                  <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>
                    {numbers[8]}
                  </div>
                  <div className='p-8 bg-slate-300 border-r-2 border-white w-20 h-20 '>
                    {numbers[9]}
                  </div>
                </div>
              </div>
            </div>


          </div>

        }




        {4 <= nextArray &&

          <div className='flex flex-col items-center gap-3'>

            <div className='flex gap-2'>
              <div className=' bg-blue-200 p-2 rounded-xl mb-4'>
                Array consisting of elements <span className='font-bold'> {numbers[3]}</span> and<span className='font-bold'> {numbers[4]}</span> will be further divided
              </div>

              <div className=' bg-blue-200 p-2 rounded-xl mb-4'>
                Array consisting of elements <span className='font-bold'> {numbers[8]}</span> and<span className='font-bold'> {numbers[9]}</span> will be further divided
              </div>
            </div>

          </div>
        }
        {5 <= nextArray &&
          <div className='flex gap-4 mb-4'>
            {numbers.map(number => {
              return (
                <div className='p-8 border-r-0 border-b-2 border-black bg-slate-300   w-20 h-20 '>
                  {number}
                </div>
              )
            })}
          </div>
        }


        {6 <= nextArray &&
          <div className='flex justify-center items-center flex-col'>

            <div className=' bg-blue-200 p-2 rounded-xl mb-4'>
              We have successfully made the array atomic i.e. seperated each element out
            </div>

            <div className=' bg-blue-200 p-2 rounded-xl mb-4'>
              We'll start merging the now :)
            </div>
          </div>
        }

        <DndProvider backend={HTML5Backend}>

          {6 <= nextArray &&
            <div className='flex justify-center gap-4 '>

              <div className='flex flex-col gap-2 justify-center items-center'>
                <div>
                  <div className=' w-56 bg-blue-200 rounded-xl p-2'>As <span className=' font-bold'> {numbers[0]} </span>&gt;  <span className=' font-bold'> {numbers[1]} </span>therefore they will interchange their positions </div>
                </div>
                <div className='flex'>

                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[1]} />
                    <span className={showNextElement == 1 || showNextElement == 2 || showNextElement == 3 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>

                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[0]} />
                    <span className={showNextElement == 3 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2 justify-center items-center'>
                <div>
                  <div className=' w-56 bg-blue-200 rounded-xl p-2'>As <span className=' font-bold'> {numbers[2]} </span>&gt;  <span className=' font-bold'> {numbers[3]} </span>therefore they will interchange their positions </div>
                </div>
                <div className='flex'>
                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[3]} />
                    <span className={showNextElement == 1 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[2]} />
                    <span className={showNextElement == 2 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                </div>
              </div>



              <div className='flex flex-col gap-2 justify-center items-center'>
                <div>
                  <div className=' w-56 bg-blue-200 rounded-xl p-2'>As <span className=' font-bold'> {numbers[4]} </span>&gt;  <span className=' font-bold'> {numbers[5]} </span>therefore they will interchange their positions </div>
                </div>
                <div className='flex'>
                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[5]} />
                    <span className={showNextElement == 4 || showNextElement == 5 || showNextElement == 6 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[4]} />
                    <span className={showNextElement == 6 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                </div>
              </div>



              <div className='flex flex-col gap-2 justify-center items-center'>
                <div>
                  <div className=' w-56 bg-blue-200 rounded-xl p-2'>As <span className=' font-bold'> {numbers[6]} </span>&gt;  <span className=' font-bold'> {numbers[7]} </span>therefore they will interchange their positions </div>
                </div>
                <div className='flex'>

                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[7]} />
                    <span className={showNextElement == 4 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[6]} />
                    <span className={showNextElement == 5 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                </div>
              </div>


              <div className='flex flex-col gap-2 justify-center items-center'>
                <div>
                  <div className=' w-56 bg-blue-200 rounded-xl p-2'>As <span className=' font-bold'> {numbers[8]} </span>&gt;  <span className=' font-bold'> {numbers[9]} </span>therefore they will interchange their positions </div>
                </div>
                <div className='flex'>

                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[9]} />
                    <span className={showNextElement == 7 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                  <div className='flex items-center flex-col'>
                    <Container shouldAccept={numbers[8]} />
                    <span className={showNextElement == 7 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                  </div>
                </div>
              </div>

            </div>
          }








          <div onClick={() => { setShowNextElement(showNextElement + 1) }} className=' cursor-pointer bg-blue-200 rounded-full w-8 h-8 flex justify-center items-center mb-4'>
            &rarr;
          </div>







          {7 <= nextArray &&
            <div className='flex justify-center gap-4'>
              <div className='flex flex-col '>
                <div className='flex'>

                  <div className={showNextElement == 1 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>As i {'>'} j  </div>
                    <div>Place {numbers[3]} below</div>
                    <div>j=j+1</div>
                  </div>
                  <div className={showNextElement == 2 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>As i {'>'} j  </div>
                    <div>Place {numbers[2]} below</div>
                    <div>j=j+1</div>
                  </div>
                  <div className={showNextElement == 3 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>As j is out of bound now  </div>
                    <div>Place all remaining elements below</div>
                  </div>
                </div>
                <div className='flex'>
                  <Container shouldAccept={numbers[3]} />
                  <Container shouldAccept={numbers[2]} />
                  <Container shouldAccept={numbers[1]} />
                  <Container shouldAccept={numbers[0]} />
                </div>
              </div>


              <div className='flex flex-col '>
                <div className='flex'>

                  <div className={showNextElement == 4 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>As i {'>'} j  </div>
                    <div>Place {numbers[7]} below</div>
                    <div>j=j+1</div>
                  </div>
                  <div className={showNextElement == 5 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>As i {'>'} j  </div>
                    <div>Place {numbers[6]} below</div>
                    <div>j=j+1</div>
                  </div>
                  <div className={showNextElement == 6 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>As j is out of bound now  </div>
                    <div>Place all remaining elements below</div>
                  </div>
                </div>
                <div className='flex'>
                  <Container shouldAccept={numbers[7]} />
                  <Container shouldAccept={numbers[6]} />
                  <Container shouldAccept={numbers[5]} />
                  <Container shouldAccept={numbers[4]} />
                </div>
              </div>


              <div className='flex flex-col '>
                <div className='flex'>

                  <div className={showNextElement == 7 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                    <div>No need to change</div>
                    <div>As thery are already sorted</div>
                    <div>Place them below</div>
                    {/* <div>j=j+1</div> */}
                  </div>

                </div>
                <div className='flex'>
                  <Container shouldAccept={numbers[9]} />
                  <Container shouldAccept={numbers[8]} />
                </div>
              </div>


            </div>
          }



          {8 <= nextArray &&
            <div className='flex justify-center gap-4'>

              <div className='flex'>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[7]} />
                  <span className={showNextElement == 8 || showNextElement == 9 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[6]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[5]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[4]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[3]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[2]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[1]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[0]} />
                  <span className={showNextElement == 10 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
              </div>

              <div className='flex'>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[9]} />
                  <span className={showNextElement == 8 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
                <div className='flex items-center flex-col'>
                  <Container shouldAccept={numbers[8]} />
                  <span className={showNextElement == 9 ? ' text-2xl opacity-100' : ' text-2xl opacity-0'}>&uarr;</span>
                </div>
              </div>

            </div>
          }

          {9 <= nextArray &&
            <div className='flex justify-center flex-col gap-4'>

              <div className='flex'>
                <div className={showNextElement == 8 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                  <div>As i {'>'} j  </div>
                  <div>Place {numbers[9]} below</div>
                  <div>j=j+1</div>
                </div>
                <div className={showNextElement == 9 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                  <div>As i {'>'} j  </div>
                  <div>Place {numbers[8]} below</div>
                  <div>j=j+1</div>
                </div>
                <div className={showNextElement == 10 ? 'flex flex-col opacity-100' : 'flex flex-col opacity-0'}>
                  <div>As j is out of bound now</div>
                  <div>Place all remaining elements below</div>
                </div>
              </div>

              <div className='flex '>
                <Container shouldAccept={numbers[9]} />
                <Container shouldAccept={numbers[8]} />
                <Container shouldAccept={numbers[7]} />
                <Container shouldAccept={numbers[6]} />
                <Container shouldAccept={numbers[5]} />
                <Container shouldAccept={numbers[4]} />
                <Container shouldAccept={numbers[3]} />
                <Container shouldAccept={numbers[2]} />
                <Container shouldAccept={numbers[1]} />
                <Container shouldAccept={numbers[0]} />
              </div>


            </div>
          }
        </DndProvider>






      </div >
    </div >
  );
}
export { ItemTypes }
export default App
