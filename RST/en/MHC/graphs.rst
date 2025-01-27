Graphs
======

Terminology
-----------

Graphs provide the ultimate in data structure flexibility.
A graph consists of a set of nodes, and a set of edges where an
edge connects two nodes.
Trees and lists can be viewed as special cases of graphs.

Graphs are used to model both real-world systems and abstract
problems, and are the data structure of choice in many
applications.
Here is a small sampling of the types of problems that graphs are
routinely used for.

#. Modeling connectivity in computer and communications networks.

#. Representing an abstract map as a set of locations with distances
   between locations. This can be used to compute shortest routes between
   locations such as in a GPS routefinder.

#. Modeling flow capacities in transportation networks to find which
   links create the bottlenecks.

#. Finding a path from a starting condition to a goal condition.
   This is a common way to model problems in artificial intelligence
   applications and computerized game players.

#. Modeling computer algorithms, to show transitions from one program
   state to another.

#. Finding an acceptable order for finishing subtasks in a complex
   activity, such as constructing large buildings.

#. Modeling relationships such as family trees, business or military
   organizations, and scientific taxonomies.

The rest of this module covers some basic graph terminology.
The following modules will describe fundamental representations for
graphs, provide a reference implementation, and cover
core graph algorithms including traversal, topological sort, shortest
paths algorithms, and algorithms to find the minimal-cost spanning tree.
Besides being useful and interesting in their own right, these
algorithms illustrate the use of many other data structures presented
throughout the course.

A :term:`graph` :math:`\mathbf{G} = (\mathbf{V}, \mathbf{E})` consists
of a set of :term:`vertices <vertex>` :math:`\mathbf{V}` and a set of
:term:`edges <edge>` :math:`\mathbf{E}`,
such that each edge in :math:`\mathbf{E}` is a connection between a
pair of vertices in :math:`\mathbf{V}`. [#]_
The number of vertices is written :math:`|\mathbf{V}|`, and the number
of edges is written :math:`|\mathbf{E}|`.
:math:`|\mathbf{E}|` can range from zero to a maximum of
:math:`|\mathbf{V}|^2 - |\mathbf{V}|`.

.. [#] Some graph applications require that a given pair of vertices
       can have multiple or parallel edges connecting them, or that a
       vertex can have an edge to itself.
       However, the applications discussed here do not require
       either of these special cases.
       To simplify our graph API, we will assume that there are no
       dupicate edges, and no edges that connect a node to itself.

A graph whose edges are not directed is called an
:term:`undirected graph`, as shown in part (a) of the following figure.
A graph with edges directed from one vertex to another
(as in (b)) is called a :term:`directed graph` or :term:`digraph`.
A graph with labels associated with its vertices
(as in (c)) is called a :term:`labeled graph`.
Associated with each edge may be a cost or :term:`weight`.
A graph whose edges have weights
(as in (c)) is said to be a :term:`weighted graph`.

.. _GraphTerms:

.. inlineav:: GdirundirCON dgm
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GdirundirCON.js
   :output: show
   :keyword: Graphs; Graph Representations

   Some types of graphs.

An edge connecting Vertices :math:`a` and :math:`b` is written
:math:`(a, b)`.
Such an edge is said to be :term:`incident` with Vertices :math:`a`
and :math:`b`.
The two vertices are said to be :term:`adjacent`.
If the edge is directed from :math:`a` to :math:`b`,
then we say that :math:`a` is adjacent to :math:`b`,
and :math:`b` is adjacent from :math:`a`.
The :term:`degree` of a vertex is the number of edges it is incident
with.
For example, Vertex :math:`e` below has a degree of three.

In a directed graph, the :term:`out degree` for a vertex is the number
of neighbors adjacent from it (or the number of edges going out from
it), while the :term:`in degree` is the number of neighbors adjacent
to it (or the number of edges coming in to it).
In (c) above, the in degree of Vertex 1 is two,
and its out degree is one.

.. inlineav:: GneighborCON dgm
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GneighborCON.js
   :output: show
   :keyword: Graphs; Graph Representations

A sequence of vertices :math:`v_1, v_2, ..., v_n`
forms a :term:`path` of length :math:`n-1` if there exist edges from
:math:`v_i` to :math:`v_{i+1}` for :math:`1 \leq i < n`.
A path is a :term:`simple path` if all vertices on the path are
distinct.
The :term:`length` of a path is the number of edges it contains.
A :term:`cycle` is a path of length three or more that connects
some vertex :math:`v_1` to itself.
A cycle is a :term:`simple cycle` if the path is simple, except for
the first and last vertices being the same.

.. inlineav:: GpathDefCON dgm
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GpathDefCON.js
   :output: show
   :keyword: Graphs; Graph Representations

An undirected graph is a :term:`connected graph` if there is at least
one path from any vertex to any other.
The maximally connected subgraphs of an undirected graph are called
:term:`connected components <connected component>`.
For example, this figure shows an undirected graph
with three connected components.

.. _ConCom:

.. inlineav:: GconcomCON dgm
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GconcomCON.js
   :output: show
   :keyword: Graphs; Graph Representations

A graph with relatively few edges is called a :term:`sparse graph`,
while a graph with many edges is called a :term:`dense graph`.
A graph containing all possible edges is said to be a
:term:`complete graph`.
A :term:`subgraph` :math:`\mathbf{S}` is formed from graph
:math:`\mathbf{G}` by selecting a subset :math:`\mathbf{V}_s` of
:math:`\mathbf{G}`'s vertices and a subset
:math:`\mathbf{E}_s` of :math:`\mathbf{G}` 's edges such that for every
edge :math:`e  \in \mathbf{E}_s`,
both vertices of :math:`e` are in :math:`\mathbf{V}_s`.
Any subgraph of :math:`V` where all vertices in the graph connect to
all other vertices in the subgraph is called a :term:`clique`.

.. inlineav:: GsparseDefCON dgm
   :links: AV/Graph/GraphDefCON.css
   :scripts: AV/Graph/GsparseDefCON.js
   :output: show
   :keyword: Graphs; Graph Representations

A graph without cycles is called an :term:`acyclic graph`.
Thus, a directed graph without cycles is called a
:term:`directed acyclic graph` or :term:`DAG`.

.. inlineav:: GacyclicDefCON dgm
    :links: AV/Graph/GraphDefCON.css
    :scripts: AV/Graph/GacyclicDefCON.js
    :output: show
    :keyword: Graphs; Graph Representations