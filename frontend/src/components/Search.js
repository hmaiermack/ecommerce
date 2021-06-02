import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Search = ({ history }) => {
    const [search, setSearch] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(search.trim()){
            history.push(`/search/${search}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text' name='q' onChange={(e) => setSearch(e.target.value)} placeholder='Search Products' className='mr-sm-2 ml-sm-5' />
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}

export default Search
