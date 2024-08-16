import { Container, Grid, Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import { useState, useEffect } from "react";

// https://www.metro.cl/api/estadoRedDetalle.php <- BASADA EN ESTA API
// https://api.xor.cl/red/metro-network (esta wea esta desactualizada)

function App() {
  const [lineas, setLineas] = useState([]);

  useEffect(() => {
    // obtenerLineas();
    setInterval(obtenerLineas, 2000);
  }, []);

  function obtenerLineas() {
    fetch("estadoRedDetalle.php.json", {
      method: "GET",
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta);
        setLineas(respuesta);
      });
  }
  return (
    <Container maxWidth={false} style={{ height: "100%", width: "100%" }}>
      <Grid container spacing={5}>
        {Object.entries(lineas).map(([key, value], i) => {
          // console.log(i + ") " + key.toUpperCase() + ": " + value.mensaje_app);
          return (
            <Grid item md={1.7} key={i} style={{ textAlign: "center" }}>
              {/* LINEAS */}
              <Typography
                bgcolor={value.estado != "1" ? red["A700"] : green["A700"]}
                variant="h2"
              >
                {key.toUpperCase()}
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(value.estaciones).map(([key2, value2], i2) => {
                  // console.log(
                  //   "    " +
                  //     i2 +
                  //     ") " +
                  //     value2.codigo +
                  //     " es " +
                  //     value2.nombre +
                  //     ": " +
                  //     value2.descripcion
                  // );
                  return (
                    <Grid item xs={12} key={i2} style={{ textAlign: "center" }}>
                      {/* ESTACIONES */}
                      <Typography
                        color={value2.estado != "1" ? red["A700"] : green["A700"]}
                        variant="h6"
                      >
                        {value2["nombre"]
                          .toString()
                          .replace(key.toUpperCase(), "")
                          .replace("U.L.A", "T U.L.A")}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
