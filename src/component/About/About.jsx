import React, {useState} from "react";
import "./About.css"
import Pop from "../../icon/pop.png";
import PDF from "../../icon/PDF.jpg"
import CreatePresentation from "./CreatePres/CreatePresentation";
import lock from "../../icon/lock.png"
import {Button, Image, Spinner, Table} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import SharePresentation from "./Share/SharePresentation";
import {getPresentation} from "../../redux/store/action_creator/presentationAC";
import {NavLink} from "react-router-dom";

const About = (props) => {
    const {Presentation, error, loading} = useSelector((state) => state.presentation);
    const [popupActive, setPopupActive] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShare, setModalShare] = React.useState(false);
    const dispatch = useDispatch();

debugger
    React.useEffect(() => {
        dispatch(getPresentation())
    }, []);

    if (loading) {
        return <div className={"error_load"}>
            <p>please wait...</p>
            <Spinner className={"spr"} animation="border" variant="warning"/>
        </div>


    }
    if (error) {
        return <div className={"error_load"}>
            <p>{error}</p>
            <Spinner className={"spr"} animation="border" variant="warning"/>
        </div>
    }

    return (<div>

        <main role="main" className="container">
            <h5 className={"mt-5"}>All Presentations</h5>
            <div className="my-3 p-3 bg-light rounded box-shadow">
                <Table hover responsive="xl">
                    <thead>
                    <tr>
                        <th></th>
                        <td>NAME</td>
                        <td className={"w-25"}>OPENED</td>
                        <td className={"w-25"}>SIZE</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Presentation.map((e, i) => {
                            return (
                                <tr key={e.id} className={"control_hover"}>
                                    <th>{
                                        e.presentation_file[0].path.endsWith('.pdf')?<Image className="mr-2 rounded" width="32px" height="32px"
                                        src={PDF}/>
                                        :<Image className="mr-2 rounded" width="32px" height="32px"
                                                src={`${process.env.REACT_APP_API_URL}${e.presentation_file[0].path}`}/>
                                    }

                                    </th>
                                    <td>{e.title}
                                        {e.is_private ?
                                            <Image width={"40px"} src={lock}/> : ""
                                        }
                                        <div><small>  {e.presentation_file[0].mime.split('/')[1]}</small></div>
                                    </td>
                                    <td>{
                                        new Date(e.createdAt).toLocaleString('en-us', { month: 'short',day: "2-digit"})
                                    }</td>
                                    <td className={"d-flex"}>
                                        {Math.round(e.presentation_file[0].size/1000)+''+ 'KB'}
                                        <Button variant="outline-dark" className="ml-5  h-25 pt-1 pb-1 control_buttons mr-2">
                                            <NavLink to={"/slider"}  style={{textDecoration: 'none',color:'grey'}} > View</NavLink>
                                        </Button>
                                        <Button className={"pt-1 pb-1 control_buttons h-25"} variant="outline-dark"
                                                onClick={() => setModalShare(true)}>Share</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link " href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="popbtn">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    <Image src={Pop} width={"50px"}/>
                </Button>
            </div>

        </main>
        <CreatePresentation
            show={modalShow}
            onHide={() => setModalShow(false)}/>
        <SharePresentation
            show={modalShare}
            onHide={() => setModalShare(false)}/>

    </div>)
}
export default About;
