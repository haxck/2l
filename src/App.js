import dbs from './dbs';
// import Swiper core and required modules
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React,{Component} from 'react';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      lastIndex: []
    }
  }



  getWords() {

    let index = Math.round(Math.random() * (dbs.length - 1))
    while (this.state.lastIndex.includes(index)) {
      index = Math.round(Math.random() * (dbs.length - 1))
    }

    console.log("index", index)
    this.setState((pres) => ({
      lastIndex: pres.lastIndex.concat(index),
    }))
    this.setState((pres) => ({
      list: pres.list.concat(dbs[index])
    }))
    console.log("seting", this.state.lastIndex)
    console.log("seting", this.state.list)


    console.log("excuted", index)
  }
  componentDidMount() {
    setTimeout(() => {
      this.getWords()
    }, 0);

  }
  render() {
    return (
      <div className="container md:mx-auto sm:w-full md:max-w-sm bg-gray-100">
        <div className='relative h-screen'>
          <div className='h-full flex justify-center items-center bg-gray-200'>
            <Splide options={{
              gap: '1rem',
              arrows: false,
              pagination: false,
              direction: 'ttb',
              height: '100vh',
              heightRatio: 0.3,
              flickMaxPages: 1
            }}
              onMoved={(e) => {
                if ((e.index + 1) >= e.length)
                  this.getWords()
              }}
              className="h-full flex justify-center items-center"
            >
              {this.state.list.map((e, i) => {

                return <SplideSlide key={i} className="text-center">{e}</SplideSlide>
              })}
            </Splide>
          </div>
          <div className="absolute bottom-10 right-4 text-center">
            <ul>
              <li>love</li>
              <li>tu</li>
              <li>info</li>
              <li>tougao</li>
            </ul>
          </div>
        </div>
      </div >
    );
  }
}

