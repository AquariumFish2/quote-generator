import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Quote(props) {
    const COLORS = ['black', 'red', 'blue','purple','grey','coral','pink','green','yellow','brown'];

    const [data, setData] = useState(null)
    const [index, setIndex] = useState(0)
    const [opacity, setOpacity] = useState(0)
    const [colorIndex, setColorIndex] = useState(0)


    function updateColorIndex() {
        setColorIndex(Math.floor(Math.random() * 10))
    }

    async function getData() {
        setOpacity(0);
        await setTimeout(async () => {
            setOpacity(100)
            try {
                const response = await fetch("https://type.fit/api/quotes")
                const d = await response.json();
                setData(d)
                setIndex(index + 1)
            }
            catch (e) {
                //   console.error(e)
            }
        }, 2000)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function updateIndex() {
        setOpacity(0)
        updateColorIndex()
        await setTimeout(() => {
            if (data.length != index + 1) {
                setIndex(index + 1)
            }
            else {
                setIndex(0)
            }
            setOpacity(100)
        }, 2000)

    }

    Quote.propTypes = {
        color: PropTypes.string
    }

    return data ? <div className='quote-container' style={{backgroundColor:COLORS[colorIndex]}}>
        <div className='quote-card'  style={{ opacity: opacity + '%' }}>
            <q className='quote'>{data[index]['text']}</q>
            <p className='author'>{data[index]['author'] == 'type.fit' ? null :
                data[index]['author'].match(/type.fit/) ? data[index]['author'].slice(0, data[index]['author'].match(/type.fit/i)?.index - 2)
                    : data[index]['author']

            }
            </p>
            <button className='update-button' onClick={updateIndex} style={{ backgroundColor: COLORS[colorIndex] }}>Next</button>
        </div>
    </div> : <div>Loading</div>
}
export default Quote