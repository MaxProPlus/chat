import React, {useCallback, useState} from 'react'
import {CircularProgress, Grid, IconButton, Typography} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import ContactApi from 'api/contact/contact'
import {Alert} from '@material-ui/lab'
import {Link} from 'react-router-dom'
import Routes_uri from '../../../routes/routes_uri'

type P = any & {updateContacts: () => void}

const Contact: React.FC<P> = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleRemove = useCallback(() => {
    setLoading(true)
    ContactApi.remove(props.id)
      .then(
        (r) => props.updateContacts(),
        (err) => setError
      )
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid
      item
      container
      key={props.id}
      style={{maxWidth: '256px'}}
      justify="space-between"
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Grid>
        <Link className="link" to={Routes_uri.CHAT + '?to=' + props.id}>
          <Typography>{props.username}</Typography>
        </Link>
      </Grid>
      <Grid>
        <IconButton size="small" onClick={handleRemove} disabled={loading}>
          {!loading ? (
            <Delete fontSize="small" />
          ) : (
            <CircularProgress size={18} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Contact
