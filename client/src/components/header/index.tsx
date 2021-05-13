import React from 'react'
import {Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Routes_uri from 'routes/routes_uri'

const Header: React.FC = () => {
  return (
    <header>
      <Grid container justify="space-between">
        <Grid item container spacing={2} className="w-auto">
          <Grid
            item
            component={Link}
            to={Routes_uri.CHAT_LIST}
            className="link"
          >
            Список чатов
          </Grid>
          <Grid item component={Link} to={Routes_uri.CONTACT} className="link">
            Список контактов
          </Grid>
        </Grid>
        <Grid item container spacing={2} className="w-auto">
          <Grid item component={Link} to={Routes_uri.LOGIN} className="link">
            Выход
          </Grid>
        </Grid>
      </Grid>
    </header>
  )
}

export default Header
