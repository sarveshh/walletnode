import React from 'react'
import Box from '@material-ui/core/Box'
import Transactions from './transactions'
import PageTitle from '../../components/layout/pagetitle';
import Tables from './tables';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { BorderAll } from '@material-ui/icons';


const Main = () => {
    const [alignment, setAlignment] = React.useState('attractive');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <PageTitle title="Transactions" />
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    size="small"
                >
                    <ToggleButton value="attractive" aria-label="left aligned">
                        <AccountTreeIcon />
                    </ToggleButton>
                    <ToggleButton value="tabular" aria-label="centered">
                        <BorderAll />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {alignment !== 'attractive' ?
                <Tables /> :
                <Transactions />
            }
        </>
    )
}

export default Main
