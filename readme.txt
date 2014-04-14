A quick demonstration of Visual Effects which adds occasional sunspots
(more in systems noted for their solar activity).

A conventional Ship would of course explode if placed this close to
the sun, as it needs to be placed on the surface to look right.

The sunspots are generated in a very basic fashion with a fragment
shader. Visual Effects can also be textured more conventionally, but
ones this large - they're several kilometres across - perhaps not very
well.

(The sunspots don't actually look particularly good close up; this is
a demonstration of principle, not a polished OXP)

Other things you can do with a Visual Effect but not a ship:
 - hide the default break pattern with station.breakPattern = false or
   system.breakPattern = false, then add Visual Effects with
   is_break_pattern set in effectdata.plist just in front of the
   player's ship for a few seconds.

 - create an entity consisting entirely of flashers

 - overlap entities without collisions. Lasers will also go straight
   through them.

 - dynamically resize the effect entities


