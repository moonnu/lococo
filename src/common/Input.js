import axios from "axios";
import React, { useState } from "react";

/*
TODO
1. 검색 버튼을 누르면 입력된 value 가져오기
2. value encoded 하기
3. api 서버에 전송하고 값을 페이지에 출력하기
*/

const Input = () => {
  const [characterName, setCharacterName] = useState("");
  const [loaApiResponse, setLoaResponse] = useState(null); // 초기 값은 null로 설정

  const onChange = (e) => {
    setCharacterName(e.target.value);
  };

  const getCharacter = async () => {
    // 검색 버튼을 누르면 입력된 value 가져오고 encoded하기
    let encoded = encodeURI(characterName);

    try {
      // api 서버에 요청 보내기
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/characters/${encoded}/siblings`,
        {
          headers: {
            accept: "application/json",
            authorization:
              "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjM3MzQifQ.cOxA0cajp7aTwULOwevlYQo83M33p4v6l2Q0HQDggo7PZ7LE0_njBcTWwN_8ss0aMdZ7GNmUbkV4c2c60WQECCZwKmd-c8kmUa108DYANuRVGQ81recNKUZYBLgMVbLWmUyWTWWpW5HuM4ekEk0YI1B6-OHhPEYgxOjteAGwOP2bSK2w2tuiby4KWZyCmWzvMpbVun36psuIWNXKvNkzwIz8uUEa8wOwV8Av5-iXWn_3OXhm6Qzly--DTZu4REftxL9sp4_7RwZ_7dX7NXleB-YlvV9BEqlX17w52LegDz_iRRUmd2BFwoVAOs76Y864xfh0NtruCT4yB9wfz5z2Qw",
          },
        }
      );

      // 응답 데이터를 상태에 저장
      setLoaResponse(response.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <input onChange={onChange} value={characterName} />
      <button onClick={getCharacter}>검색</button>
      <div>
        {/* 상태에 저장된 응답 데이터를 출력 */}
        <b>값: {loaApiResponse ? JSON.stringify(loaApiResponse) : ""}</b>
      </div>
    </div>
  );
};

export default Input;
