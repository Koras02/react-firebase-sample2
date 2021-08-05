import React, { useState } from 'react'
import { Card, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Dashboard() {
    // 로그인 실패시 오류 숨기기
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
  
    const history = useHistory()

    // 로그아웃시 async 로 다시 로그인 화면으로 이동
    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')

        } catch {
            setError("로그아웃 실패!")
        }
    }


    return (
        <>
          <Card>
              <Card.Body>
                   <h2 className="text-center mb-4">프로필</h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                   <strong>이메일: </strong> {currentUser.email}
                   <Link to="/update-profile" className="btn btn-primary w-100
                     mt-3">프로필 업데이트</Link>
              </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
               <Button varriant="link" onClick={handleLogout}>로그 아웃</Button>
           </div>
        </>
    )
}
