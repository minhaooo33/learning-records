function Tab({children,button,Container="menu"}){
  
    return (
    <>
        <Container>
            {button}
        </Container>
       {children}
    </>
    )
}
export default Tab