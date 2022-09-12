// 레시피 목록

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TreeItem, TreeView } from '@material-ui/lab';


const Posts = ({ realData, current }) => {
  let navigate = useNavigate();
  // current(realData);
  let [simple, setSimple] = useState([]);
  const [valueState, setValueState] = useState('');
  const onChangeHandler = (event) => {
    const value = event.target.value
    setValueState(value)
  }

  const [inputState, setInputState] = useState('');

  useEffect(()=>setSimple(realData),[realData])

  const handleInput = (event) => {
    const input = event.target.value
    setInputState(input)
    console.log(input)  // 검색어 출력
    const filtered = realData.filter((itemList) => {
      if(valueState === '1')
        return itemList.writer.toUpperCase().includes(input.toUpperCase());
      else if(valueState === '2')
        return itemList.date.toUpperCase().includes(input.toUpperCase());
      else
        return itemList.dish_name.toUpperCase().includes(input.toUpperCase());
    });
    if (input === '') {
      setSimple(realData)
    } else {
      setSimple(filtered);
    }
  }

  return (
    <>
    <div className='write'>
      <select defaultValue='0' className='select' onChange={onChangeHandler}>
        <option value='0'>글제목</option>
        <option value='1'>작성자</option>
        <option value='2'>작성일</option>
      </select>

      <input type='text' className='searchI' onChange={handleInput} placeholder='Search'></input>
      <span className='blind'>-</span>
      <button className='searchB' onClick={()=>{
        inputState === '' ? alert('검색어를 입력해주세요.') : console.log(inputState)
      }}>검색</button>
      </div><br/>


      <div className="results">
        {simple.length > 0 && (
          <TreeView multiselect>
          {simple.map((post, i) => {
            //console.log(simple)
             return (
              <TreeItem
              key={i}
                // nodeId={}
                label={
                  <h3 className='list' key={post.dish_num} 
                  onClick={()=>{
                  navigate('/detail/'+ post.dish_num)
                  }}>
                  <div className="titleD">
                    {i+1}. {simple[i].dish_name} 
                  </div>
                  <small> ❤️{simple[i].hit}</small>
                  <small> 😋 백번먹어
                    {/* {post.ate} */}
                    </small>
                  <div className="date">{simple[i].writer} | {simple[i].date}</div>
                  </h3>
                  }
                />
              );
            })}
          </TreeView>
        )}
      </div>

    </>
  );
};

export default Posts;