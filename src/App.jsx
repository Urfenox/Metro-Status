import { Subway } from "@mui/icons-material";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { red, green } from "@mui/material/colors";
import { useState, useEffect } from "react";

// https://www.metro.cl/api/estadoRedDetalle.php <- BASADA EN ESTA API
// https://api.xor.cl/red/metro-network (esta wea esta desactualizada)

function App() {
  const [lineas, setLineas] = useState([]);

  useEffect(() => {
    // obtenerLineas();
    const intervalo = setInterval(obtenerLineas, 2000);
  }, []);

  async function obtenerLineas() {
    fetch("https://www.metro.cl/api/estadoRedDetalle.php", {
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
      <Grid container spacing={2}>
        {Object.entries(lineas).map(([key, value], i) => {
          return (
            <Grid item md={1.7} key={i} style={{ textAlign: "center" }}>
              {/* LINEAS */}
              <Typography
                bgcolor={value.estado != "1" ? red["A700"] : green["A700"]}
                variant="h2"
              >
                {key.toUpperCase()}
              </Typography>
              <Grid container>
                <List dense={true}>
                  {Object.entries(value.estaciones).map(
                    ([key2, value2], i2) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          key={i2}
                          style={{ textAlign: "center" }}
                        >
                          <ListItem>
                            <ListItemIcon>
                              <Subway
                                sx={{
                                  color:
                                    value2.estado != "1"
                                      ? red["A700"]
                                      : green["A700"],
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={value2["nombre"]
                                .toString()
                                .replace(key.toUpperCase(), "")
                                .replace("U.L.A", "T U.L.A")}
                              secondary={
                                value2.estado != "1"
                                  ? value2["descripcion_app"]
                                  : value2["descripcion"]
                              }
                            />
                          </ListItem>
                        </Grid>
                      );
                    }
                  )}
                </List>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
