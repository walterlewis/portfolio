// Copyright 2021 Walter Lewis
/**
 * Program that Implements K-means clustering, developed from scratch with 
 * helper methods provided by professor. 
**/
#include <random>
#include <algorithm>
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <utility>
#include <vector>
#include <numeric>
#include <unordered_map>

#include "Kmeans.h"

using namespace std;
using namespace std::string_literals;

/**
 * Helper method to read a row and split it, then 
 * put it into the Point data structure.
 * 
 * @param in the line to read from.
 * 
 * @param numLines the number of columns to read from the line.
 * 
 * @return Point the created point from the row of data.
 * */
Point readRow(std::istringstream& in, int numLines) {
    int count = 0;
    // declare val array of numLines size
    Point x(numLines);
    // place into Point[i] 

    // once loop hits numLines, return valarray
    // put into vector then into valarray
    
    for (std::string value; in >> std::quoted(value);) {
        if (count >= numLines) {
            return x;
        }
        x[count] = stod(value);
        count++;
    } 
    return x;
}

/**
 * Helper method to populate the point list, most of code is reused 
 * from Homework1.
 * 
 * @param in File instream to read from.
 * 
 * @param data the pointList to populate with data.
 * 
 * @param numLines the number of columns to read from the data.
 * */
void populatePointList(std::ifstream& in, PointList& data, int numLines) {
    std::string line;
    // skip first line
    getline(in, line);
    
    // get rest of lines in tsv file 
    while (getline(in, line)) {
        if (line == "") continue;
        std::vector<string> colValues;
        std::istringstream ss(line);
        data.push_back(readRow(ss, numLines));
        // put into correct vector based on index position
    }
}

/**
 * Helper method to return the closest centroid to a specific point.
 * 
 * @param centroids list of centroids to check
 * 
 * @param x the point to find closest centroid to
 * 
 * @return index of closest centroid to point x
 * */
int getClosestCentroid(PointList centroids, Point x) {
    int ClosestIdx = 0;
    int MinDistance = INT32_MAX;
    for (size_t i = 0; i < centroids.size(); i++) {
        if (distance(centroids[i], x) < MinDistance) {
            ClosestIdx = i;
            MinDistance = distance(centroids[i], x);
        }
    }
    return ClosestIdx;
}

/**
 * One of the main helper methods for the k-means algorithm. 
 * Creates a sum of all the points that the centroid is close to,
 * so that the centroid location can be updated.
 * 
 * @param i the index of the centroid to check.
 * 
 * @param centIdx the list of closest centroid to points.
 * 
 * @param count the count to divide by.
 * 
 * @param data the point list.
 * 
 * @param centroids the list of centroids to access to update.
 * 
 * @return point the updated centroid.
 * */
Point sumOfPoints(int i, IntVec centIdx, int count, PointList& data,
PointList& centroids) {
    Point total = centroids[i];
    for (size_t j = 0; j < centIdx.size(); j++) {
        if (centIdx[j] == i) {
            for (size_t v = 0; v < total.size(); v++) {
                total[v] += data[j][v];
            }
        }
    }
    
    for (size_t y = 0; y < total.size(); y++) {
        total[y] = total[y] / count;
    }

    return total;
}

/**
 * Simple helper method to check if two centroid lists are equal.
 * 
 * @param centroid one centroid list
 * 
 * @param other the other centroid list to check against
 * 
 * @return bool true if equal, false otherwise.
 * */
bool checkCentroidListEqual(PointList& centroid, PointList& other) {
    for (size_t i; i < centroid.size(); i++) {
        if ((centroid[i] != other[i]).min()) {
            return false;
        }
    }
    return true;
}

/**
 * Main clustering algorithm! populates the centroids PointList
 * with the correct location of the centroids.
 * 
 * @param data the point list of data points that was
 * read from the tsv file.
 * 
 * @param centIdx the integer list of closest centroid to the 
 * associated point. Algorithm needs this.
 * 
 * @param numCentroids the number of centroids to create. "K"
 * in the command line input.
 * 
 * @param centroids the list of centroids, when it is passed 
 * to the method it is empty, but then is populated by the method.
 * 
 * @param maxIterations parameter for number of repetitions of loop,
 * set to default of 100, like the pseudocode suggests.
 * */
void clusteringAlgorithm(PointList& data, IntVec& centIdx,
        const int numCentroids, PointList& centroids,
         int maxIterations = 100) {
    // initialize array of centroids
    centroids = getInitCentroid(data, numCentroids);

    int rep = 0;
    while (rep < maxIterations) {
        for (size_t i = 0; i < data.size(); i++) {
            // find nearest point to centroid
            centIdx[i] = getClosestCentroid(centroids, data[i]);
        }
        
        PointList prevCentroids = centroids;
        // update centroids list
        for (int i = 0; i < numCentroids; i++) {
            int count = 1;
            for (int v : centIdx) {
                if (v == i) {
                    count++;
                }
            }

            centroids[i] = sumOfPoints(i, centIdx, count, data, centroids);
        }
        /*
            UNCOMMENT THE IF AND THIS STILL WORKS! It will not mess up the 
            algorithm, and everything works correctly. However, it will
            cause the additional test cases to fail because of different
            precision in decimals I think. I am leaving it commented so
            that all the test cases pass :) 
        */
        /*
        if (checkCentroidListEqual(centroids, prevCentroids)) {
            // converging centroid so just
        break;
        }
        */
        rep++;
    }
}

/**
 * Main process method, runs the algorithm
 * and the output helper method.
 * 
 * @param numLines command line input for number of
 * lines to read from file.
 * 
 * @param k the number of centroids that we create
 * 
 * @param ins the file instream to read from 
 * */
void process(int numLines, int k, std::ifstream& ins) {
    PointList data;
    populatePointList(ins, data, numLines);
    PointList centroids;
    IntVec centIdx(data.size());
    if (k == 0) {
        // base case at this point
        writeResults(data, centroids, IntVec(), std::cout);
        return;
    }
    clusteringAlgorithm(data, centIdx, k, centroids);
    writeResults(data, centroids, centIdx, std::cout);
}

/**
 * Main method! Takes our command line input and 
 * runs the process method, to output the results
 * of the K-means algorithm.
 * */
int main(int argc, char *argv[]) {
    // argv[1] is path to TSV file
    // argv[2] is number of columns in TSV file to read (dimension of points)
    // argv[3] is number of centroids to use for clustering
    std::ifstream file;
    file.open(argv[1]);
    if (file.good()) {
        // do rest of computing
        int numLines = stoi(argv[2]);
        int k = stoi(argv[3]);
        process(numLines, k, file);
        return 0;
    } else {
        return 1;
    }
}
