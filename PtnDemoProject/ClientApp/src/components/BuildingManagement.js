import React, { Component } from 'react';
import { Grid, Button, TextField, Autocomplete, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apicaller from '../utils/api'
import SnackbarComp from './Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const Column = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default class BuildingManagement extends Component {
    static displayName = 'Building Management';

    constructor(props) {
        super(props);
        this.state = {
            buildingTypes: [],
            buildingType: null,
            buildingTypeId: null,
            buildingCost: null,
            constructionTime: null,
            constructionTimeErrorMessage: null,
            buildingCostErrorMessage: null,
            data: [],
            filteredBuildingTypes: [],
            open: false,
            openSnackbar: false,
            snackbarMessage: null,
            snackbarSeverity: null
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCloseConfigPopup = this.handleCloseConfigPopup.bind(this);
        this.handleAddConfiguration = this.handleAddConfiguration.bind(this);
        this.buildingTypechange = this.buildingTypechange.bind(this);
        this.buildingCostchange = this.buildingCostchange.bind(this);
        this.constructionTimechange = this.constructionTimechange.bind(this);

        this.getConfigurationData();
        this.getBuildingTypes();
    }
    showSnackbar = (message, severity) => {
        this.setState({
            openSnackbar: true, snackbarMessage: message, snackbarSeverity: severity,
        });
    };

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSnackbar: false
        });
    };

    getConfigurationData = async () => {
        const response = await apicaller.CONFIGURATION.getAllConfigData();
        if (response && response.data) {
            this.setState({ data: response.data })
        }
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

        if (response && response.status == 200) {
            this.getConfigurationData();
        }

        this.handleCloseConfigPopup();
    };

    handleDelete = async (id) => {
        const response = await apicaller.CONFIGURATION.delete(id);

        if (response && response.status == 200) {
            this.getConfigurationData();
        }
    }

    handleClickOpen = () => {
        const existingBuildings = this.state.data.map(item =>
            (item.buildingType)
        )

        this.setState({
            open: true,
            buildingType: null,
            buildingCost: null,
            buildingTypeId: null,
            constructionTime: null,
            filteredBuildingTypes: this.state.buildingTypes.filter(t => existingBuildings.indexOf(t.name) == -1)
        })
    };

    handleCloseConfigPopup = () => {
        this.setState({
            open: false,
            buildingType: null,
            buildingCost: null,
            buildingTypeId: null,
            constructionTime: null
        })
    };

    handleAddConfiguration = () => {
        if (this.state.constructionTime < 30 || this.state.constructionTime > 1800) {
            this.showSnackbar("Value must be between 30 and 1800", "error");
            return;
        }
        this.addConfiguration();

    };

    buildingTypechange = (event, option) => {
        this.setState({
            buildingType: option.name,
            buildingTypeId: option.id,
        })
    };
    buildingCostchange = (event) => {
        const value = event.target.value;
        if (value < 0) {
            this.setState({ buildingCostErrorMessage: 'Value must be greater than 0' });
        } else {
            this.setState({ constructionTime: value, buildingCostErrorMessage: '' });
        }
    };
    constructionTimechange = (event) => {
        const value = event.target.value;
        if (value < 30 || value > 1800) {
            this.setState({ constructionTimeErrorMessage: 'Value must be between 30 and 1800' });
        } else {
            this.setState({ constructionTime: value, constructionTimeErrorMessage: '' });
        }
    };



    render() {
        return (
            <>
                <Button variant="outlined" className="configuration-add-button" onClick={this.handleClickOpen} >+</Button>

                <Grid container spacing={2} sx={{ width: 1 }}>
                    <Grid item xs={3}>
                        <Column>Building Type</Column>
                    </Grid>
                    <Grid item xs={3}>
                        <Column>Building Cost</Column>
                    </Grid>
                    <Grid item xs={3}>
                        <Column>Construction Time</Column>
                    </Grid>
                    <Grid item xs={3}>
                        <Column><SettingsIcon fontSize='small' /></Column>
                    </Grid>
                    {this.state.data.map((d, i) => (
                        <React.Fragment key={i}>
                            <Grid item xs={3}>
                                <Column>{d.buildingType}</Column>
                            </Grid>
                            <Grid item xs={3}>
                                <Column>{d.buildingCost}</Column>
                            </Grid>
                            <Grid item xs={3}>
                                <Column>{d.constructionTime}</Column>
                            </Grid>
                            <Grid item xs={3}>
                                <Column>
                                    <IconButton sx={{ padding: '0px' }} size='small' aria-label="delete" color="error" onClick={() => this.handleDelete(d.id)}>
                                        <DeleteIcon fontSize='small' />
                                    </IconButton>
                                </Column>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleCloseConfigPopup} >
                    <DialogTitle>Add New Configuration</DialogTitle>
                    <DialogContent sx={{ height: 350, width: 400 }}>

                        <Autocomplete
                            disablePortal
                            id="buildingType"
                            options={this.state.filteredBuildingTypes}
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
                            inputProps={{
                                type: "number",
                                min: 0
                            }}
                        />
                        {this.state.buildingCostErrorMessage && (
                            <p style={{ color: 'red' }}>{this.state.buildingCostErrorMessage}</p>
                        )}
                        <TextField
                            margin="dense"
                            id="constructionTime"
                            label="Construction Time(sec)"
                            fullWidth
                            variant="standard"
                            onChange={this.constructionTimechange}
                            inputProps={{
                                type: "number",
                                min: 30,
                                max: 1800,
                            }}
                        />
                        {this.state.constructionTimeErrorMessage && (
                            <p style={{ color: 'red' }}>{this.state.constructionTimeErrorMessage}</p>
                        )}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseConfigPopup}>Cancel</Button>
                        <Button onClick={this.handleAddConfiguration}>Add</Button>
                    </DialogActions>
                </Dialog>
                <SnackbarComp
                    open={this.state.openSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleClose={this.handleCloseSnackbar}
                />
            </>
        );
    }
}