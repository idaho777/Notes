Project 1: Introduction to Socket Programming
==============

<p>Name:       Joonho Kim</p>
<p>E-mail:     jkim844@mail.gatech.edu</p>
<p>Class Name: CS 3251</p>
<p>Section:    A</p>
<p>Date:       09/19/2014</p>
<p>Title:      Introduction to Socket Programming</p>

Files
-----
<p>RemoteCalc_Server_TCP.java is the TCP Server on our localhost.</p>
<p>RemoteCalc_Server_UDP.java is the UDP Server on our localhost.</p>
<p>RemoteCalc_TCP.java is the TCP client program on our localhost.</p>
<p>RemoteCalc_UDP.java is the UDP client program on our localhost.</p>
<p>RemoteCalc_Server_TCP.py is the extra credit TCP Server on our local host.</p>
<p>sample.txt is a sample output file.</p>

How to Compile
--------------
**To compile run**:
    <p>javac *.java </p>

**To run our calculator using TCP**:
    <p>- java RemoteCalc_Server_TCP <PortNumber> </p>
    <p>- java RemoteCalc_TCP <PortNumber> <Add/Multiply> <number0> <number1> </p>

**To run our calculator using UDP**:
    <p>- java RemoteCalc_Server_UDP <PortNumber> </p>
    <p>- java RemoteCalc_UDP <PortNumber> <Add/Multiply> <number0> <number1> </p>

**To run our calculator using TCP with Java client and Python server**
    <p>- python RemoteCalc_Server_TCP.py <PortNumber> </p>
    <p>- java RemoteCalc_TCP <PortNumber> <Add/Multiply> <number0> <number1> </p>

Bugs or limitations
-------------------
- In the servers, I had to do a hack to shorten the length of the data byte arrays from incoming packets in order to parse the arguments using split().
