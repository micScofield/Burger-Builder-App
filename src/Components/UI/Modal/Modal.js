import React from 'react';
//import Transition from 'react-transition-group/Transition'
import CSSTransition from 'react-transition-group/CSSTransition'
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary'

const modal = props => {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    // render() {
    //     const cssClasses = [classes.Modal, props.show ? classes.ModalOpen : classes.ModalClose]

    //     return props.show ? 
    //             <Aux>
    //                 <div className={cssClasses.join(' ')}>
    //                     {props.children}
    //                 </div>

    //                 <Backdrop show={props.show} backdropClicked={props.backdropClicked} />
    //             </Aux>
    //         : null
    // }


    // render() {
    //     const cssClasses = [classes.Modal, props.show === 'entering' ? classes.ModalOpen
    //         : props.show === 'exiting' ? classes.ModalClose : null]

    //     return (
    //         <Aux>
    //             <div className={cssClasses.join(' ')}>
    //                 {props.children}
    //             </div>
    //             <Backdrop show={true} backdropClicked={props.backdropClicked} />
    //         </Aux>
    //     )
    // }
    return (
        // <Transition
        //     in={props.show}
        //     timeout={{
        //         enter: 300,
        //         exit: 200
        //     }}
        //     mountOnEnter
        //     unmountOnExit>

        //     {state => {
        //         const cssClasses = [
        //             classes.Modal,
        //             state === 'entering' ? classes.ModalOpen :
        //                 state === 'exiting' ? classes.ModalClosed : null
        //         ]
        //         return (
        //             <Aux>
        //                 <div className={cssClasses.join(' ')}>
        //                     {props.children}
        //                 </div>

        //                 <Backdrop show={props.show} backdropClicked={props.backdropClicked} />
        //             </Aux>
        //         )
        //     }}
        // </Transition>


        <CSSTransition
            in={props.show}
            timeout={{
                enter: 400,
                exit: 300
            }}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: '',
                enterActive: classes.ModalOpen,
                exit: '',
                exitActive: classes.ModalClosed
            }}>
            <Aux>
                <div className={classes.Modal}>
                    {props.children}
                </div>

                <Backdrop show={props.show} backdropClicked={props.backdropClicked} />
            </Aux>
        </CSSTransition>
    )
}

export default React.memo(
    modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);