import React, { useEffect, useState } from 'react'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StoreDashboard from '../Layout/StoreDashboard';
import { apiUrl } from '../API/apiUrl';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    heade: {
        backgroundColor: "white"
    }
});

function Orders() {
    const classes = useStyles();

    const [orders, setOrders] = useState()
    // const user = localStorage.getItem('user')

    useEffect(() => {
        axios.get(`${apiUrl}/order/user`, {
            headers: {
                'Authorization': localStorage.getItem('zomtoken'),
            },
        }).then(res => {
            setOrders(res.data.orders)
        });
    }, [])

    console.log(orders)

    return (
        <StoreDashboard>
            <div className="flex flex-col min-h-screen p-6">
                <p className="text-3xl font-semibold text-gray-500 dark:text-white mb-5">List Of All Orders</p>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead className={classes.heade}>
                            <TableRow >
                                <StyledTableCell>Order #</StyledTableCell>
                                <StyledTableCell align="right">Customer</StyledTableCell>
                                <StyledTableCell align="right">Item</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Date Created</StyledTableCell>
                                <StyledTableCell align="right">Phone Number</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <>
                            {orders?.map(order => (
                                <TableItemsRow
                                    key={order._id}
                                    orderId={order._id}
                                    customer={order.orderer}
                                    status={order.status}
                                    phonenumber={order.phonenumber}
                                    datecreated={order.datecreated}
                                    item={order.item}
                                    id={order._id}
                                />
                            ))}
                        </>
                    </Table>
                </TableContainer>
            </div>
        </StoreDashboard>
    )
}

const TableItemsRow = ({ orderId, customer, status, phonenumber, datecreated, item, id }) => {
    const [openTDialog, setOpenDialog] = useState(false);

    const openDialog = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const deleteOrder = (e) => {
        e.preventDefault()
        console.log('delete order')
    }
    const confirmOrder = (e) => {
        e.preventDefault()
        console.log('confirm order')
    }

    return (
        <TableBody>
            <StyledTableRow className="text-sm text-center border-b border-gray-300 items-center" key={`order._id`}>
                <StyledTableCell>{orderId}</StyledTableCell>
                <StyledTableCell align="right">{customer}</StyledTableCell>
                <StyledTableCell align="right">{item}</StyledTableCell>
                <StyledTableCell align="right">
                    <p className="bg-blue-200 text-center border px-1 border-blue-800 rounded-full">{status}</p>
                </StyledTableCell>
                {/* <StyledTableCell align="right">{order.createdAt.substring(0, 10)}</StyledTableCell> */}
                <StyledTableCell align="right">{datecreated.split('GMT+0200 (Central Africa Time)')}</StyledTableCell>
                <StyledTableCell align="right">{phonenumber}</StyledTableCell>
                <StyledTableCell align="right">
                    <span onClick={openDialog} className="cursor-pointer">
                        <CheckCircleOutlineRoundedIcon fontSize="small" className="hover:text-blue-400 cursor-pointer rounded text-blue-700 mr-1" />
                    </span>
                    {/* dialog for confirming the order */}
                    <Dialog
                        open={openTDialog}
                        onClose={closeDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <p className="text-gray-700 font-semibold text-xl">{"Confirm payment by customer"}</p>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <p className="text-gray-600">You are confirming that the customer has payed for the product fully</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDialog} color="primary" autoFocus>
                                Cancel
                            </Button>
                            <Button onClick={confirmOrder} color="primary" >
                                <p className="font-semibold">Confirm</p>
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <span onClick={deleteOrder} className="cursor-pointer">
                        <DeleteForeverRoundedIcon fontSize="small" className="hover:text-red-800 rounded cursor-pointer text-red-700 ml-1" />
                    </span>
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
    )
}

export default Orders
