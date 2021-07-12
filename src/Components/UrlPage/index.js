import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button, Link, Avatar } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import Logo from '../../Assets/logo.jpg';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';



const Index = ({ selectedCategory, setUrl }) => {

    const [urlData, setUrlData] = useState({});
    const [urlList, setUrlList] = useState(JSON.parse(localStorage.getItem("urlList")) ? JSON.parse(localStorage.getItem("urlList")) : []);

    const onTextChange = (e) => {
        setUrlData({
            ...urlData,
            [e.target.name]: e.target.value,
            selectedCategory: selectedCategory
        })
    }

    const onSubmit = () => {
        window.event.preventDefault();
        if (urlData.name && urlData.url) {

            setUrlList([
                ...urlList,
                urlData
            ])
        }
    }

    const deleteItem = (index) => {
        if (index > -1) {
            let newArray = urlList.filter((val, i) => i !== index);
            setUrlList(newArray);
        }
    }

    useEffect(() => {
        localStorage.setItem("urlList", JSON.stringify(urlList));
    }, [urlList])

    return (
        <form >
            <Grid container spacing={2} style={{ margin: 'auto', width: '80vw', marginTop: 50, padding: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                <Grid item container justify="space-between" alignItems="center" xs={12}>
                    <Avatar alt="Shop List Logo" src={Logo} style={{ width: 70, height: 70 }} />
                    <Typography variant="h5" align="center">{selectedCategory}</Typography>
                </Grid>
                <Grid item container justifyContent="center" xs={12}>
                    <Grid item container spacing={2} xs={12} lg={10}>
                        <Grid item xs={12} lg={4}>
                            <TextField
                                id="standard-full-width"
                                label="Name of Shop"
                                name="name"
                                style={{ margin: 6 }}
                                placeholder="Amazon, Aliexpress etc"
                                onChange={(e) => onTextChange(e)}
                                // helperText="Full width!"
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} lg={8}>
                            <TextField
                                id="standard-full-width"
                                label="Enter URL"
                                name="url"
                                required
                                style={{ margin: 6 }}
                                placeholder="https://www.aliexpress.com"
                                // helperText="Full width!"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onTextChange(e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>



                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" type="submit" onClick={onSubmit} color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container justifyContent="center" xs={12}>
                    <Grid item container justifyContent="center" xs={12}>
                        <List component="nav" style={{ width: '70%' }} aria-label="main mailbox folders" subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Saved Urls
                            </ListSubheader>
                        }>

                            {
                                urlList.map((value, index) => value.selectedCategory === selectedCategory && (
                                    <div>
                                        <ListItem button key={index} component={Link} target="_blank" href={value.url}>
                                            <ListItemIcon>
                                                <AddShoppingCartIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={value.url} secondary={value.name} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="middle" />
                                    </div>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
                <Grid item >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowLeftIcon />}
                        size="small"
                        onClick={() => setUrl(false)}
                    >
                        Back
                    </Button>

                </Grid>
            </Grid>
        </form >
    )
}

export default Index;
