import { Container, Grid, Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import { useState, useEffect } from "react";

// https://api.xor.cl/red/metro-network <- BASADA EN ESTA API
// https://www.metro.cl/api/estadoRedDetalle.php

function App() {
  const [lineas, setLineas] = useState([]);

  useEffect(() => {
    obtenerLineas();
  }, [lineas]);

  function obtenerLineas() {
    fetch("https://api.xor.cl/red/metro-network", {
      method: "GET",
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        setLineas(respuesta.lines);
      });
  }
  return (
    <Container maxWidth={false} disableGutters>
      {/* <Box sx={{ width: 1 }}> */}
      <Grid container spacing={2}>
        {Object.entries(lineas).map(([key, value], i) => {
          console.log(i + ") " + key + " es " + value.name);
          return (
            <Grid item md={1.7} key={i} style={{ textAlign: "center" }}>
              {/* LINEAS */}
              <Typography
                bgcolor={value.issues ? red["50"] : green["900"]}
                variant="h2"
              >
                {value.name}
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(value.stations).map(([key2, value2], i2) => {
                  console.log("    " + i2 + ") " + key2 + " es " + value2.name);
                  return (
                    <Grid item xs={12} key={i2} style={{ textAlign: "center" }}>
                      {/* ESTACIONES */}
                      <Typography
                        color={
                          value2.status > 0 || value2.is_closed_by_schedule
                            ? red["A700"]
                            : green["A700"]
                        }
                        variant="h6"
                      >
                        {value2.name}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      {/* </Box> */}
    </Container>
  );
}

export default App;
