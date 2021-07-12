import { Paper, Typography, Grid, TextField, Button, Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import { Autorenew } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import Logo from '../../Assets/logo.jpg';
import { useHistory } from 'react-router';


const Index = ({ setSelectedCategory, setUrl }) => {
    const [folder, setFolder] = useState([]);
    const [folderList, setFolderList] = useState(JSON.parse(localStorage.getItem("folderList")) ? JSON.parse(localStorage.getItem("folderList")) : []);
    const history = useHistory();

    const onTextChange = (e) => {
        setFolder({
            ...folder,
            [e.target.name]: e.target.value,
        })
        setSelectedCategory(e.target.value);
    }

    const onSubmit = () => {
        console.log({ folder })
        window.event.preventDefault();
        if (folder.name) {
            setFolderList([
                ...folderList,
                folder
            ])
            localStorage.setItem("folderList", JSON.stringify(folderList));
        }
    }

    const onFolderClick = (item) => {
        console.log({item})
        setSelectedCategory(item.name ? item.name : "No Name");
        setUrl(true);
    }



    useEffect(() => {
        localStorage.setItem("folderList", JSON.stringify(folderList));
        let newArray = JSON.parse(localStorage.getItem("folderList"))
    }, [folderList])

    return (
        <form >
            <Grid container spacing={2} style={{ margin: 'auto', width: '70vw', marginTop: 50, padding: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                <Grid item container justify="space-between" alignItems="center" xs={12}>
                    <Avatar alt="Shop List Logo" src={Logo} style={{ width: 70, height: 70 }} />
                    <div style={{ display: 'flex', height: 40 }}>
                        <TextField
                            id="standard-full-width"
                            label="Create New Folder"
                            name="name"
                            placeholder="Write Folder Name..."
                            onChange={(e) => onTextChange(e)}
                            // helperText="Full width!"
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={() => onSubmit()} style={{ marginLeft: 5 }}>Submit</Button>
                    </div>
                </Grid>
                <hr />

                <Grid item xs={12}>
                    <Typography variant="h5" align="center">Select Folder</Typography>
                </Grid>
                <Grid item container style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        folderList.map((item) => {
                            return (
                                <Paper onClick={() => onFolderClick(item)} elevation={3} style={{ padding: 10, margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                    <FolderSpecialIcon style={{ width: 80, height: 80 }} />
                                    <Typography variant="p" noWrap={true} style={{ margin: 'auto', maxWidth: 90 }}>{item.name}</Typography>
                                </Paper>
                            )
                        })
                    }
                </Grid>

            </Grid>
        </form>
    )
}

export default Index;