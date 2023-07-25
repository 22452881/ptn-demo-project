import { Component } from "react";
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apicaller from '../utils/api'

const Column = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const data = [
    {
        buildingType: 'Farm',
        buildingCost: 15000,
        constructionTime: 50
    },
    {
        buildingType: 'Academy',
        buildingCost: 18000,
        constructionTime: 100
    },
    {
        buildingType: 'Headquarters',
        buildingCost: 27000,
        constructionTime: 150
    },
];

// const buildingTypes = [
//     // { label: 'Farm', value: 0 },
//     // { label: 'Academy', value: 1 },
//     // { label: 'Headquarters', value: 2 },
//     // { label: 'LumberMill', value: 3 },
//     // { label: 'Barracks', value: 4 },
// ];



export default class BuildingManagement extends Component {
    static displayName = 'Building Management';



    constructor(props) {
        super(props);
        this.state = {
            buildingTypes: [],
            open: false,
            buildingType: null,
            buildingTypeId: null,
            buildingCost: null,
            constructionTime: null
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.buildingTypechange = this.buildingTypechange.bind(this);
        this.buildingCostchange = this.buildingCostchange.bind(this);
        this.constructionTimechange = this.constructionTimechange.bind(this);

        this.getBuildingTypes();
    }

    getBuildingTypes = async () => {
        const response = await apicaller.BUILDING_TYPE.getAll();

        if (response && response.data) {
            this.setState({ buildingTypes: response.data })
        }
    };

    addConfiguration = async () => {
        const configuration = {
            buildingType: this.state.buildingType,
            buildingTypeId: this.state.buildingTypeId,
            buildingCost: this.state.buildingCost,
            constructionTime: this.state.constructionTime
        };
        const response = await apicaller.CONFIGURATION.add(configuration);

        if (response && response.data) {
            data.push(configuration);
        }

        this.handleClose();
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
            buildingType: null,
            buildingCost: null,
            buildingTypeId: null,
            constructionTime: null
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
            buildingType: null,
            buildingCost: null,
            buildingTypeId: null,
            constructionTime: null
        })
    };

    handleAdd = () => {
        this.addConfiguration();
    };

    buildingTypechange = (event, option) => {
        this.setState({
            buildingType: option.name,
            buildingTypeId: option.id,
        })
    };
    buildingCostchange = (event) => {
        this.setState({
            buildingCost: event.target.value
        })
    };
    constructionTimechange = (event) => {
        this.setState({
            constructionTime: event.target.value
        })
    };



    render() {
        return (
            <>
                <Button variant="outlined" className="configuration-add-button" onClick={this.handleClickOpen} >+</Button>

                <Grid container spacing={2} sx={{ width: 1 }}>
                    <Grid item xs={4}>
                        <Column>Building Type</Column>
                    </Grid>
                    <Grid item xs={4}>
                        <Column>Building Cost</Column>
                    </Grid>
                    <Grid item xs={4}>
                        <Column>Construction Time</Column>
                    </Grid>
                    {data.map((d, i) =>
                        Object.values(d).map((v, j) =>
                            <Grid item key={`${i}.${j}`} xs={4}><Column>{v}</Column></Grid>
                        )

                    )}
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>Add New Configuration</DialogTitle>
                    <DialogContent>

                        <Autocomplete
                            disablePortal
                            id="buildingType"
                            options={this.state.buildingTypes}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField fullWidth variant="standard" {...params} label="Building Type" />}
                            onChange={this.buildingTypechange}
                            getOptionLabel={(option) => option.name ?? option}
                        /><TextField
                            margin="dense"
                            id="buildingCost"
                            label="Building Cost"
                            fullWidth
                            variant="standard"
                            onChange={this.buildingCostchange}
                        /><TextField
                            margin="dense"
                            id="constructionTime"
                            label="Construction Time"
                            fullWidth
                            variant="standard"
                            onChange={this.constructionTimechange}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}