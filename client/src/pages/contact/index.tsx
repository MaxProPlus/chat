import React, {useCallback, useEffect, useState} from 'react'
import {CircularProgress, Container, Grid, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import ContactApi from 'api/contact/contact'
import Header from 'components/header'
import {AddContactForm} from './components/AddContactForm'
import Contact from './components/Contact'

const Page: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const update = useCallback(() => {
    setLoading(true)
    ContactApi.getAll()
      .then(
        (r) => {
          setContacts(r)
        },
        (err) => setError(err)
      )
      .finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth="sm" className="mt-3">
      <Header/>
      <Grid container direction="column" alignItems="center" className="mt-3">
        <Typography component="h1" variant="h5" align="center">
          Список контактов
        </Typography>
        <AddContactForm updateContacts={update} />
        {error && <Alert severity="error">{error}</Alert>}
        {!loading ? (
          contacts.map((c) => (
            <Contact key={c.id} updateContacts={update} {...c} />
          ))
        ) : (
          <CircularProgress className="mx-auto"/>
        )}
      </Grid>
    </Container>
  )
}

export default Page
