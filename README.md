Project 1: Introduction to Socket Programming
==============

Name:       Joonho Kim
E-mail:     jkim844@mail.gatech.edu
Class Name: CS 3251
Section:    A
Date:       09/19/2014
Title:      Introduction to Socket Programming

Files
-----
<p>RemoteCalc_Server_TCP.java is the TCP Server on our localhost.<p>
<p>RemoteCalc_Server_UDP.java is the UDP Server on our localhost.<p>
<p>RemoteCalc_TCP.java is the TCP client program on our localhost.<p>
<p>RemoteCalc_UDP.java is the UDP client program on our localhost.<p>
<p>RemoteCalc_Server_TCP.py is the extra credit TCP Server on our local host.<p>
<p>sample.txt is a sample output file.<p>

How to Compile
--------------
**To compile run**:
    javac *.java

**To run our calculator using TCP**:
    - java RemoteCalc_Server_TCP <PortNumber>
    - java RemoteCalc_TCP <PortNumber> <Add/Multiply> <number0> <number1>

**To run our calculator using UDP**:
    - java RemoteCalc_Server_UDP <PortNumber>
    - java RemoteCalc_UDP <PortNumber> <Add/Multiply> <number0> <number1>

**To run our calculator using TCP with Java client and Python server**
    - python RemoteCalc_Server_TCP.py <PortNumber>
    - java RemoteCalc_TCP <PortNumber> <Add/Multiply> <number0> <number1>

Bugs or limitations
-------------------
- In the servers, I had to do a hack to shorten the length of the data byte arrays from incoming packets in order to parse the arguments using split().
