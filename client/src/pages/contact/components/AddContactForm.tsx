import React, {useCallback, useState} from 'react'
import {Box, CircularProgress, Grid, IconButton, TextField} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {Add} from '@material-ui/icons'
import ContactApi from 'api/contact/contact'

type P = {
  updateContacts: () => void
}

export function AddContactForm({updateContacts}: P) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault()
      setError('')
      setLoading(true)
      ContactApi.add(username).then(
        (r) => {
          updateContacts()
        },
        (err) => {
          setError(err)
        }
      ).finally(()=>{
        setLoading(false)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container>
        <Grid item>
          <TextField
            value={username}
            onChange={useCallback((e) => setUsername(e.target.value), [])}
            required
            placeholder="Добавить контакт"
            margin="normal"
          />
        </Grid>
        <Grid item>
          <IconButton size="medium" onClick={handleSubmit} disabled={loading}>
            {loading? <CircularProgress size={24}/>: <Add />}
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}
